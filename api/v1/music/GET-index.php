<?php

//unsafe script, no checks here

auth();

$playlists = $GLOBALS['e_mongo']->data->music->find();

emit(iterator_to_array($playlists));

?>