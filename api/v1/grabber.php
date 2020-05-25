<?php

/*This module can grab arguments from REQUEST and deal with them. It
* also contains a bunch of validators for your convenience. */


$GLOBALS['grab_url_decode'] = true;
//If this equal to true, then all demand() and grab() results will be
//url-decoded.
$GLOBALS['grab_absent_params'] = [];
//Every unexisting parameter you're trying to catch by demand() will
//be stored here
$GLOBALS['grab_inappropriate_params'] = [];
//Store all inappropriate params here and process they all as whole.


function limiter($a, $b=null, $asInt=true) {
	/*This function validates passed variables by value (if it's int)
	* or length (for strings).
	* Syntax:
	* limiter(int lower, int upper) or limiter(int upper)
	* Examples:
	* limiter(5)(18)		>>> false,	because 0 < 18 < 5,
	* limiter(2, 10)("abc")	>>> true,	because 2 < length < 10. */

	if(empty($b)) {
		$b = $a;
		$a = 0;
	}

	return function($var) use ($a, $b, $asInt) {
		return !$asInt
			? (($a <= mb_strlen($var))	&& (mb_strlen($var) <= $b))
			: (($a <= $var * 1)			&& ($var * 1 <= $b));
	};
}


function equaler($val) {
	/*Validates passed variables by value (for ints) or lengths (for
	* strings). 
	* Examples:
	* equaler(5)(5)		>>> true, because 5 == 5,
	* equaler(4)("abc") >>> true, because strlen("abc") != 4*/

	return function($var) use ($val) {
		return is_string($var)
			? mb_strlen($var) == $val
			: $var == $val;
	};
}


function is_bson_id() {
	/*Check whether the $value is valid BSON ObjectId. */

	return function($value) {
		return ctype_xdigit($value) && equaler(12 * 2)($value);
	};

}


function is_one_of($arr) {
	/*Check if $value is in $arr. */

	return function($value) use ($arr) {
		return in_array($value, $arr);
	};
}


function demand($what='', $validator=null, $note=true) {
	/*Use this function to catch $what-paremeter from request.
	* E.g if $what='url', value from $_REQUEST['url'] will be returned
	* If $note is switched on, missing parameter will be added to
	* GLOBAL 'e_absent_params'. */

	$variable = null;
	if( isset($_REQUEST[$what]) ) {
		$variable = $_REQUEST[$what];
	}else{
		if($note)
			array_push(
				$GLOBALS['grab_absent_params'],
				$what
			);
		return null;
	}

	if($GLOBALS['grab_url_decode'])
		$variable = urldecode($variable);

	if(isset($validator) && !$validator($variable))
		array_push(
			$GLOBALS['grab_inappropriate_params'],
			$what
		);

	return $variable;
}


function demandBool($what='') {
	/*This function works just like `demand`, but allows to catch bool
	* parameters. */
	return array_key_exists($what, $_REQUEST);
}


function grab($what='', $validator=null, $default=null) {
	/*Use this function like demand(), but you can set $default that
	* will be used if parameter is absent. */

	return demand($what, $validator, false) ?? $default;
}


function checkGrabErrors() {
	/*Look if some data is stored in `grab_absent_params` or in
	* `grab_inappropriate_params` and return unprocessable_entity
	* if so. */

	$fields = array_merge(
		array_fill_keys(
			$GLOBALS['grab_absent_params'], "Missed."),
		array_fill_keys(
			$GLOBALS['grab_inappropriate_params'], "Wrong.")
	);

	if(count($fields) == 0) return false;

	unprocessable_entity($fields);

}


?>