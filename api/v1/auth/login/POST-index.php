<?php

$db = $GLOBALS['e_mongo']->auth;

$auth_data = [
	'login'			=> demand('login'),
	'password'		=> hash('sha256', demand('password'), false)];

checkGrabErrors();

$hash = hash('sha256', $auth_data['password'], false);

$find_user = $db->users->findOne($auth_data);

if(empty($find_user)) {
	forbidden(
		"No such user exists or wrong password.", AUTH_NOT_EXISTS);
}

$look_relogin = $db->relogin_tokens->findOne([
	'user_id'		=> $find_user->_id
]);

if(empty($look_relogin)) {
	$relogin_token = $db->relogin_tokens->insertOne([
		'user_id'	=> $find_user->_id,
		'token'		=> emitkey(
			'relogin_token', generate_auth_token(20)),
		'created'	=> new MongoDB\BSON\UTCDateTime()]);
} else {
	emitkey('relogin_token', $look_relogin->token);
}

$access_token = $db->access_tokens->insertOne([
	'user_id' 		=> $find_user->_id,
	'token' 		=> emitkey(
		'access_token', generate_auth_token(20)),
	'created'		=> new MongoDB\BSON\UTCDateTime()]);


emitkey('user', new User($find_user));
emitkey('expire', 86400);

finish();

?>
