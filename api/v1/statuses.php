<?php
/*This module contains functions that will help you return proper response
* status easier. */

$GLOBALS['e_debug_mode'] = true;
//Do not show error text, when something is broken. Just throw status
//with error.

define('E_SEE_STATUS',			0x00);
define('AUTH_NOT_EXISTS',		0x10);
define('AUTH_LOGIN_EXISTS',		0x11);


function fail($response=[], $errno=E_SEE_STATUS) {
	/*This function aborts script execution with showing
	* json-encoded $response. */

	echo json_encode([
		"status"	=> "fail",
		"errno"		=> $errno,
		"response"	=> $response]);
	exit;
}


function successful($response=[]) {
	/*End script execution and shows congratulation message with
	* sparkles and unicorns. */
	echo json_encode([
		"status"	=> "ok",
		"response"	=> $response]);
	exit;
}


function not_found($msg, $errno=E_SEE_STATUS) {
	/*Requested resourse was not found. */

	http_response_code(404);
	fail(["msg" => $msg], $errno);
}


function bad_request($parameters=[], $errno=E_SEE_STATUS) {
	/*This function raise 400 Bad Request error code. This means that
	* some of parameters user must pass to API-script is absent or
	* GET query with this parameters returned no result. In
	* $parameters just list all of them. */

	http_response_code(400);
	fail($parameters, $errno);
}


function conflict($sources=[], $errno=E_SEE_STATUS) {
	/*Raise 409 Conflict. This means that some of data user trying to
	* write is already exists. (Error on 'duplicate key' and so on).
	* Pass all sources (e.g. tables) in $sources*/

	http_response_code(409);
	fail($sources, $errno);
}


function forbidden($msg="You have no rights here.", $errno=E_SEE_STATUS) {
	/*Raise 403 Forbidden. This means that user have not enough rights
	* for some action.*/

	http_response_code(403);
	fail(["msg" => $msg], $errno);
}


function unprocessable_entity($fields=[], $errno=E_SEE_STATUS) {
	/*Raise 422 Unpocessable Entity. This means that some of API
	* parameters are invalid. $fields must contains associative
	* array with all fields and reason of their invalidity. Example:
	* $fields = [ ['name'=>..., 'description'=>...], ... ] */

	http_response_code(422);
	fail($fields, $errno);
}


function internal_error(
	$file=__FILE__, $line=0, $string='Uncaught.', $errno=E_SEE_STATUS
) {
	/*Raise 500 Internal Server Error. This means that some internal
	* error had happened. If 'error_debug_mode' switched on, there
	* will also be 'debug' object. */

	http_response_code(500);
	$response = [
		'msg' => $string
	];
	if($GLOBALS['e_debug_mode'])
		$response['debug'] = [
			'time' => date("Y-m-d H:i:s"),
			'file' => $file,
			'line' => $line
		];

	fail($response, $errno);
}


function bad_gateway(
	$text='Unknown', $debugmsg='', $url='', $errno=E_SEE_STATUS
) {
	/*Raise 502 Bad Gateway. This means that some error with quering
	* to another server happened. */

	http_response_code(502);
	$response = [
		'msg' => $text
	];
	if($GLOBALS['e_debug_mode'])
		$response['debug'] = [
			'time' => date("Y-m-d H:i:s"),
			'msg' => $debugmsg,
			'url' => $url
		];

	fail($response, $errno);
}

function no_content($message, $errno=E_SEE_STATUS) {
	/*Returns 204 No Content. This means that method executed
	* successfuly, but nothing to return. */

	successful(["msg" => $message]);
}

?>