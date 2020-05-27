<?php

/*This is framework file which provides authorization machinery. */


/*Settings.*/

$GLOBALS['auth_token_var'] = 'token';
//Each time authorization should be checked, script will look for a
//variable named `$GLOBALS['auth_token_var']` to grab access_token.
$GLOBALS['auth_relogin_token_var'] = 'relogin';
//Variable name for relogin token.
$GLOBALS['auth_token_lifespan'] = 60 * 60 * 24;
//Lifespan of access token in seconds.
$GLOBALS['auth_relogin_lifespan'] = 60 * 60 * 24 * 30;
//Lifespan of relogin token in seconds.


/*Global constants. */

$GLOBALS['auth_access_token'] = grab(
		$GLOBALS['auth_token_var']);
//Temporary access token.
$GLOBALS['auth_relogin_token'] = grab(
		$GLOBALS['auth_relogin_token_var']);
//Relogin token user should know to renew access token.
$GLOBALS['auth_user_successful'] = null;
//If authorization was successful, this constant == true.

$GLOBALS['auth_user_id'] = null;
$GLOBALS['auth_user_obj'] = null;

$GLOBALS['auth_disable'] = true;

function generate_auth_token($length) {
	return bin2hex(random_bytes($length));
}

function auth($strict=true) {
	/*Check whether access token were provided and returns `forbidden`
	* status if it's not correct. Returns `true` if authorization
	* was successful and `false` if token is not set.
	* If $strict==true and token is not provided, method will raise
	* `forbidden` status.*/

	if($GLOBALS['auth_disable']) return true;

	$coll = $GLOBALS['e_mongo']->auth->access_tokens;

	if($GLOBALS['auth_user_successful'] != null) {
		//One the function was called nothing changed.
		return $GLOBALS['auth_user_successful'];
	}

	if(empty($GLOBALS['auth_access_token'])) {
		return $strict
			? forbidden(
				"Please provide access token", AUTH_UNAUTHORIZED)
			: false;
	}

	$record = $coll->findOne(
		['token' => $GLOBALS['auth_access_token']]);

	if(empty($record)) {
		$GLOBALS['auth_user_successful'] = false;
		forbidden(
			"No rights for this token were assigned.", AUTH_NOT_FOUND);
	}

	//Token is outdated.
	/*if(
		abs(
			$record->created->toDateTime()->getTimestamp() -
			(new DateTime())->getTimestamp()
		) > $GLOBALS['auth_token_lifespan']
	) {
		$GLOBALS['auth_user_successful'] = false;

		try{
			$coll->deleteOne(
				['token' => $GLOBALS['auth_access_token']]);
		}

		catch (Exception $e) {
			bad_gateway(
				"Stuck with writing to DB.", DB_WRITE);
		}

		forbidden(
			"Your access_token is outdated.", AUTH_OUTDATED);
	}*/

	//Token exists and not outdated.

	$GLOBALS['auth_user_successful'] = true;
	$GLOBALS['auth_user_id'] = $record->user_id;

	return true;

}


function checkRelogin() {
	/*Check whether the relogin_token were provided and it's valid.
	* Does the same as `auth` function. */

	$coll = $GLOBALS['e_mongo']->auth->relogin_tokens;

	if(empty($GLOBALS['auth_relogin_token']))
		return forbidden(
			"Please provide relogin token", AUTH_UNAUTHORIZED);

	$record = $coll->findOne([
		'token' => $GLOBALS['auth_relogin_token']]);


	if(empty($record))
		forbidden(
			"Bad relogin token.", AUTH_NOT_FOUND);

	//Token is outdated.
	if(
		abs(
			$record->created->toDateTime()->getTimestamp() -
			(new DateTime())->getTimestamp()
		) > $GLOBALS['auth_relogin_lifespan']
	) {

		try{
			$coll->deleteOne(
				['token' => $GLOBALS['auth_relogin_token']]);
		}

		catch (Exception $e) {
			bad_gateway(
				"Stuck with writing to DB.", DB_WRITE);
		}

		forbidden(
			"Your relogin_token is outdated.", AUTH_OUTDATED);
	}

	$GLOBALS['auth_user_successful'] = true;
	$GLOBALS['auth_user_id'] = $record->user_id;

	return true;

}

function loadUser() {

	if(!$GLOBALS['auth_user_successful'])
		forbidden(
			"User was not authorized.", AUTH_NOT_FOUND);

	$GLOBALS['auth_user_obj'] = User::byId(
		new MongoDB\BSON\ObjectId($GLOBALS['auth_user_id']));

	return $GLOBALS['auth_user_obj'];

}

?>