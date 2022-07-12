function getDate(){
	var date = new Date();
	var year = (date.getFullYear()-2000);
	var month = ((date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1));
	var day = (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
	var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
	var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	return `${year}/${month}/${day} ${hour}:${minute}`;
}
function sendMessage(){
	const user = $("#user").val(), message = $("#message").val(), date = getDate();
	$("#message").val("");
	$("#user").attr("readonly", true);
	var msg = {
		from: user,
		text: message,
		time: date
	};
	appendMsg(msg, false);
	socket.send(JSON.stringify(msg));
}
function appendMsg(msg, fromOther){
	var container = $("<div></div>");
	if(fromOther)
		container.addClass("w-50 mt-1 bg-secondary p-1 rounded align-self-start");
	else
		container.addClass("w-50 mt-1 text-black bg-info p-1 rounded align-self-end");
	container.append($("<p></p>").text(msg.text));
	container.append($("<small></small>").text(msg.from + ' ' + msg.time));
	$("#messagebox").append(container);
}