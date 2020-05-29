<?php
/*This file routes GET, POST, PUT, PATCH and DELETE user queries
* to the corresponds php script. To get the idea of structure, please
* go to api-structure.html in this directory*/

set_include_path(__DIR__);

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Request-Headers: X-Requested-With, accept, content-type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");

$api_v = "v1";
$request_uri = $_SERVER["REQUEST_URI"];
$method = $_SERVER['REQUEST_METHOD'];
$framework_uri = "env.php";
$shell_uri = "shell.php";
$auth_uri = "auth.php";

//Requests to this paths on `api/v1` will raise 404 status. 
$forbidden_paths = ["classes", "bins"];


$dir = dirname(__FILE__);


//grab params
if($method!=='GET' or $method!=='POST') {
	$params = [];
	parse_str(file_get_contents("php://input"), $params);
	$_REQUEST = array_merge($params, $_REQUEST);
}

//we're going to parse url to file recursively
function callScript($path) {
	global $dir;
	global $path_params;
	global $method;

	//recursion exit
	if( count($path)==0 ) {	
		return "{$dir}/{$method}-index.php";
	}

	$curr_level = array_pop($path); //reduce $path
	$folder = scandir($dir);

	if( in_array($curr_level, $folder) ) {
		//go ahead, if this directory exists
		$dir .= "/{$curr_level}";
	}else{
		//if not, maybe it's the path parameter?
		//looking for _underline folders
		foreach ($folder as $root)
            if($root[0] == '_')
				$params[] = $root;
		//if it's really a path parameter...
		if( isset($params) and count($params)!==0 ) {
			$param_name = substr($params[0], 1);
			//remember that
			$_REQUEST[ $param_name ] = $curr_level;
			$dir .= "/_{$param_name}";
		}else{
			return false;
		}
	}
	return callScript($path);
}

//wipe out get-parameters if they passed
$request_uri = explode("?", $request_uri)[0];

$path = explode('/', $request_uri);
//slice (/tg/api/v2/methodname) to (methodname)
$f = array_slice($path, array_search($api_v, $path) + 1);


require_once 'statuses.php';


if(in_array($f[0], $forbidden_paths))
	not_found("File not found.");

$scriptName = callScript( array_reverse($f) ); //convert to stack

if( file_exists($scriptName) ) {

	header('Content-Type: application/json; charset=UTF-8');
	require 'vendor/autoload.php';

	try{
		require_once $framework_uri;
		require_once $auth_uri;
		require_once $scriptName;
	}

	catch(MongoDB\Driver\Exception\ConnectionException $e) {
		bad_gateway(
			'Error with DB connection.',
			$e->getMessage()
		);
	}

	catch(MongoDB\Driver\Exception\ExecutionTimeoutException $e) {
		bad_gateway(
			'Too big DB request.',
			$e->getMessage()
		);
	}

	catch(MongoDB\Driver\Exception $e) {
		bad_gateway(
			'Error with DB.',
			$e->getMessage()
		);
	}

	catch(Exception $e) {
		internal_error(__FILE__, -1, $e->getMessage());
	}

	catch(Error $e) {
		internal_error(
			$e->getFile(), $e->getLine(), $e->getMessage());
	};

	die();

} else {

	// check, if user asks for file
	$location = $_SERVER["DOCUMENT_ROOT"] . $request_uri;
	if(!file_exists($location)) not_found("File not found.");
	$mime = [
		"html" => "text/html",
		"css" => "text/css",
		"js" => "application/javascript",
		"json" => "application/json",
		"mp3" => "audio/mpeg"
	][
		pathinfo($location, PATHINFO_EXTENSION)
	] ?? "text/plain";
	header("Content-Type: {$mime}; charset=UTF-8");
	readfile($location);

	die();
}

http_response_code(404);

?>
