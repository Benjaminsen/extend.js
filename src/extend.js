/*
	ExtendJS 0.1.0
	More info at http://extendjs.org

	Copyright (c) 2013 ChrisBenjaminsen.com

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
(function(){
	var skip = {constructor:true, toString:true, super:true};
	var base = this;
	this.Class = function(){};
	Class.extend = function(to){
		function initialize(method){
			//Recursivly execute parent methods.
			if(method.parent){
				initialize.apply(this,[method.parent]);
				var ns = superCopy(this,this.constructor);
				cloneCopy(this,ns);
				this.super = ns;
			}
			method.apply(this, arguments);
		}

		//Helper method for creating an super copied object clone
		function cloneCopy(from, to){
			for(var x in from){
				if(from[x] instanceof Function && !skip[x] ){
					//Never create circular super referances.
					to[x] = from[x].super || superCopy(from, from[x]);
				}
			}
		}

		//Helper method which allows for super referances.
		function superCopy(scope, method){
			var scopeSuper = scope.super;
			method.super = function(){
				scope.super = scopeSuper;
				scope.super = method.apply(scope, arguments);
				return scope.super;
			}
			return method.super;
		}

		var child = function(){
			//Prevent the prototype scope set executing the constructor.
			if(skip === arguments[0]) return;
			//Create inhereted object
			initialize.apply(this,[to]);
			//Setup scope for class instance method calls
			cloneCopy(this,this);
			if(this.initializer) this.initializer.apply(this);
			this.constructor.apply(this,arguments);
		}


		//Validate that we defined a constructor.
		var rt = to.toString().match(/function\s+(\w+)/i);//to.toString().match(/this\.constructor[^=]?=[^f]?function\s?(\w+)/i)
		if(!rt || rt.length == 0) throw "You must declare a classname for " + to;

		var type = rt[1] || "Unknown";

		//Set prototype and constructor enabeling propper type checking.
		child.prototype = new this(skip);
		child.prototype.constructor = child;

		//Setup inherentence path.
		child.prototype.inheritancePath = to.inheritancePath = to.inheritancePath ? to.inheritancePath + "->" + type : type;
		
		//Fix tostrings
		child.toString = function(){
			return "[Class "+type+"]";
		}
		child.prototype.toString = function(){
			return "[Instance "+type+"]";
		}

		//Allow the child to be extended.
		var ext = arguments.callee;
		child.extend = function(target){
			//Create parent referance and inherentence path.
			target.parent = to;
			target.inheritancePath = to.inheritancePath;
			return ext.apply(child,arguments);
		}

		base[type] = child;
		//return child
	}
	//Bootstrap Class by inheriting itself with empty constructor.
	Class.extend(function Class(){this.constructor=function(){}});
})()