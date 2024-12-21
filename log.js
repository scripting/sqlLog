const myVersion = "0.4.0", myProductName = "sqlLog"; 

exports.addToLog = addToLog; 
exports.getRecentLogItems = getRecentLogItems; 
exports.start = start; 

var config = {
	maxFeedItems: 100
	};

function addToLog (eventName, err, eventData, callback) { //12/7/24 by DW
	const theLogItem = {
		eventName, 
		eventData,
		eventError: "",
		whenCreated: new Date ()
		};
	if (err) {
		theLogItem.eventError = err.message;
		}
	var sqltext = "insert into log " + davesql.encodeValues (theLogItem);
	davesql.runSqltext (sqltext, function (err, result) {
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			rssChanged (); //12/10/24 by DW
			if (callback !== undefined) {
				callback (undefined, theLogItem);
				}
			}
		});
	}
function getRecentLogItems (callback) {
	const sqltext = "select * from log order by id desc limit " + config.maxFeedItems + ";"; 
	davesql.runSqltext (sqltext, function (err, rows) {
		if (err) {
			callback (err);
			}
		else {
			var theItems = new Array ();
			rows.forEach (function (item) {
				var jstruct;
				
				try {
					jstruct = JSON.parse (item.eventData);
					}
				catch (err) {
					jstruct = undefined;
					}
				
				theItems.push ({
					id: item.id,
					eventName: item.eventName,
					eventError: (item.eventError.length == 0) ? undefined : JSON.parse (item.eventError),
					eventData: (jstruct) ? jstruct : undefined,
					whenCreated: item.whenCreated
					});
				});
			callback (undefined, theItems);
			}
		});
	}

function start (userOptions, callback) {
	utils.mergeOptions (userOptions, config);
	if (callback !== undefined) {
		callback ();
		}
	}
