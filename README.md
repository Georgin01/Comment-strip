# Comment-strip
A simple function to delete comments using regular expressions.

What does it do? Removes comments of any kind.
<pre>
/* 
	this is 
	multi-line 
	comment 
*/
//this is simple comment
</pre>

But do not touch the comments of this type

<pre>
`//this isn`t a comment`
alert("//this is also not a /*comment*/");
console.log('/*still not a coment*/');
</pre>

I would be happy to receive feedback. Maybe someone will figure out how to simplify or improve the function.
