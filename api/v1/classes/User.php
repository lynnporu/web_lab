<?php

class User implements JsonSerializable{

	private $name;
	private $id;

	public function __construct($mongodoc) {
		$this->name			= $mongodoc->name;
		$this->id			= $mongodoc->_id;
	}

	public static function byId($id) {
		return new User(
			$GLOBALS['e_mongo']->auth->users->findOne([
				'_id' => $id]));
	}

	public function jsonSerialize() {
		return [
			"id"	=> $this->id->__toString(),
			"name"	=> $this->name
		];
	}

	public function subscription() {
		return $this->subscription;
	}

}
