<?php
/*This is framework file, that includes to every API-script, that
* executes on this server*/

require_once 'grabber.php';


spl_autoload_register(function ($className) {
	require_once 'classes/' . $className . '.php';
});


/*Here we have some globals that sets script behaviour in
* different cases. You can redeclare any of them. Each variable are
* commented and default-valued. */


/*Use this array to set credentials for databases. */

$GLOBALS['e_credentials'] = [
	'local' => 'mongodb://localhost:27017'
];

$GLOBALS['e_db_default'] = 'local';
//Connect using this credentials by default.

$GLOBALS['e_mongo'] = connect_mongo();


$GLOBALS['e_emit'] = [];
//Data from emit() function will be stored here.


/*php_uname returns 'Windows' or 'Linux' string for 's' parameter,
* so $GLOBALS['e_os'] will be evaluated to OS_WINDOWS or OS_LINUX
* constant. */

define('OS_WINDOWS',	0);
define('OS_LINUX',		1);

$GLOBALS['e_os'] = array_search(
	php_uname('s'), ['Windows', 'Linux']);


function emit($data=null) {
	/*End script with given data as response. */

	successful($data);
}


function emitkey($key, $data=null) {
	/*Does like `emit`, but allow to emit several data, placing it
	* into e_emit and assigning your key to it. Complete emitting by
	* `finish` function. */

	$GLOBALS['e_emit'][$key] = $data;
	return $data;
}


function finish() {
	/*Shows `emitkey` data and exit. */

	successful($GLOBALS['e_emit']);
}


function decode_bitmask($mask=0, $properties=[]) {
	/*This function takes $properties that is list of peoperties that
	* encoded in $mask. There's no limit to input data. We flip the
	* properties array from [[0]=>a, [1]=>b] to [a=>0, b=>1]. Then
	* loop that array with iterative $n, that starts from 0 and do
	* some bitwise operation to check if n-th bit is set. */

	$properties = array_flip($properties);
	$n = -1;
	foreach($properties as $property => &$value)
		$value = ($mask & 1<<++$n) ? true : false;

	return $properties;
}


function encode_bitmask($properties=[]) {
	/*This function takes $properties that is associative array of
	* properties and their values: [prop1=>true, prop2=>false]. Then
	* it sets correspond bits from the side right and returns result.
	* Note, that $n is iterative. */

	$mask = 0;
	$n = -1;
	foreach($properties as $property => $value) {
		$n++;
		if($value)
			$mask |= 1<<$n;
	}

	return $mask;
}


function connect_mongo($dbname=null) {
	/*Returns Mongo connection.*/

	return new MongoDB\Client(
		$GLOBALS['e_credentials'][
			$dbname ?? $GLOBALS['e_db_default']]);
}


?>
