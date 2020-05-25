<?php

$db = $GLOBALS['e_mongo']->auth;

$auth_data = [
	'name'			=> demand('name'),
	'login'			=> demand('login'),
	'password'		=> hash('sha256', demand('password'), false)];

checkGrabErrors();

$find_user = $db->users->findOne([
	'login'			=> $auth_data['login']
]);

if(!empty($find_user)){
	forbidden(
		"Such login is already exists.", AUTH_LOGIN_EXISTS);
}

// look for the user in `users` collection, create if not exists.

$user_id = $db->users->insertOne($auth_data);

$user_id = $user_id->getInsertedId();

// look if user with this id is already logged in.

$relogin_token = $db->relogin_tokens->insertOne([
	'user_id'	=> new MongoDB\BSON\ObjectId($user_id),
	'token'		=> emitkey(
		'relogin_token', generate_auth_token(20)),
	'created'	=> new MongoDB\BSON\UTCDateTime()]);


$access_token = $db->access_tokens->insertOne([
	'user_id' 		=> new MongoDB\BSON\ObjectId($user_id),
	'token' 		=> emitkey(
		'access_token', generate_auth_token(20)),
	'created'		=> new MongoDB\BSON\UTCDateTime()]);

emitkey('user',
	['name' => $auth_data['name'], 'id' => $user_id->__toString()]);
emitkey('expire', 86400);

finish();

?>
