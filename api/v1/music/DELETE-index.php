<?php

//unsafe script, no checks here

auth();

$id = demand('id');
checkGrabErrors();

$GLOBALS['e_mongo']->data->music->deleteOne([
	'_id' => new MongoDB\BSON\ObjectId($id)
]);

no_content("Track was deleted.");

?>