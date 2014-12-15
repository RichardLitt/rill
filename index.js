'use strict';

var moment = require('moment')

var argv = require('minimist')(process.argv.slice(2),  {
    alias: {
    	i: 'init',
    	m: 'message'
    },
    boolean: ['b']
});

/* Constructor */
function Git(name) {
	this.branches = []
	this.name = name
	this.lastCommitId = -1 // TODO Implement SHA-1
	var master = new Branch('master', null)
	this.branches.push(master)

	this.HEAD = master
}

Git.prototype.commit = function(message) {
	message = message || argv.m // TODO Implement y/b bash request
	var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
	this.HEAD.commit = commit
	return commit
}


Git.prototype.log = function() {
		var commit = this.HEAD.commit
		var history = []

		while (commit) {
			history.push(commit)
			if (commit.message) { console.log(commit.id, commit.message) }
			commit = commit.parent
		}

		return history
}

Git.prototype.checkout = function (branchName) {
	// Check if a branch already exists with name = branchName
	for (var i = this.branches.length; i--;) {
		if (this.branches[i].name === branchName) {
			console.log('Switched to existing branch: ' + branchName)
			this.HEAD = this.branches[i]
			return this
		}
	}

	if (argv.b) {
		// Else create new branch
		var newBranch = new Branch(branchName, this.HEAD.commit)
		this.branches.push(newBranch)
		this.HEAD =  newBranch
		console.log('Switched to new branch: ' + branchName)
		return this
	} else {
		console.log('This branch does not exist: ' + branchName)
		// TODO Add in create? option
		return
	}
}

function init(name) {
	var repo = repo || new Git((name || argv.i || 'my-repo'))
	return repo
}

function Commit(id, parent, message) {
	this.id = id
	this.message = message
	this.parent = parent
	this.time = moment()
}

function Branch(name, commit) {
	this.name = name
	this.commit = commit
}

var repo = init('test');
repo.commit('Initial commit');

exports.init = init()
exports.checkout = repo.checkout()
exports.commit = repo.commit()
exports.log = repo.log()
