<?php

class User implements JsonSerializable{

	private $name;
	private $id;
	private $login;

	public function __construct($mongodoc) {
		$this->name			= $mongodoc->name;
		$this->id			= $mongodoc->_id;
		$this->login        = $mongodoc->login;
	}

	public static function byId($id) {
		return new User(
			$GLOBALS['e_mongo']->auth->users->findOne([
				'_id' => $id]));
	}

	public function jsonSerialize() {
		return [
			"id"	=> $this->id->__toString(),
			"name"	=> $this->name,
			"login" => $this->login
		];
	}

	public function subscription() {
		return $this->subscription;
	}

}
