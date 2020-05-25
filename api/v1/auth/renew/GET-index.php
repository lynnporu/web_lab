<?php

checkRelogin();
loadUser();

$new_token = $GLOBALS['e_mongo']->auth->access_tokens->insertOne([
	'user_id'	=> $GLOBALS['auth_user_id'],
	'token'		=> emitkey(
		'access_token', generate_auth_token(20)),
	'created'	=> new MongoDB\BSON\UTCDateTime()]);

if (!$new_token->isAcknowledged()) {
	bad_gateway("Can't create access token.", AUTH_ACCESS);
}

emitkey("user", $GLOBALS['auth_user_obj']);
emitkey("relogin_token", $GLOBALS['auth_relogin_token']);
emitkey("expire", $GLOBALS['auth_token_lifespan']);

finish();


?>