<?php

auth();

$user = $GLOBALS['e_mongo']->auth->access_tokens->findOne([
	'token' => $GLOBALS['auth_access_token']])->user_id;

try{

	$GLOBALS['e_mongo']->auth->access_tokens->deleteMany([
		'user_id' => $user]);

	$GLOBALS['e_mongo']->auth->relogin_tokens->deleteMany([
		'user_id' => $user]);

} catch(Exception $e) {
	bad_gateway('Stuck with writing to DB.', DB_WRITE);
}

no_content('All your tokens was destroyed.');

?>