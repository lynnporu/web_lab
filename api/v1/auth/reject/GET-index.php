<?php

auth();

try{
	$GLOBALS['e_mongo']->auth->access_tokens->deleteOne([
		'token' => $GLOBALS['auth_access_token']]);
} catch(Exception $e) {
	bad_gateway('Stuck with writing to DB.', DB_WRITE);
}

no_content('This token was rejected.');

//nuff said

?>