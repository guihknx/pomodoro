jQuery(function (e) {

    e(function () {
        //call init()
        POMODORO.init();
    });

    var POMODORO = {
        init: function () {
            // initialize all as bootstrap

            this.startX();
            this.Table2CSV();
            this.PreventAccidentalClose();
            this.ElasticTextarea();

        },
        startX: function () {
            window.history.pushState("object or string", "Title", "#ready");
            // once user mouveover the title has been reset
            e(document).on('mouseover', function () {
                document.title = "POMODORANO";
            });

            // e('.finished').on('click', function () {
            //     var plr = document.getElementById('d');
            //     plr.play();
            // });
            
            //when page loads hide stats panel
            e('#stats').hide();

            // when page loads hide the pomodoros table
            e('#pomodoros').hide();

            var _thisClock = null,
                _thisStart = 0,
                _thisTarget = e('#ht'),
                _thisPaused = false,
                index = 1;

            // YouTube PoupUp
            e("#yt").keyup(function (e) {
                if (e.which == 13) {
                    window.history.replaceState("object or string", "Title", "#VideoContext");
                    $('<div class="unipromo-modal"></div>').unipromo({
                        title: 'YouTube',
                        scheme: 'dark',
                        cancelable: 0,
                        name: 'youtube',
                        iframe: $('#yt').val() + '&autoplay=1'
                    }).unipromo();
                    $.subscribe('modal_exit.youtube modal_cancel.youtube', function (e) {
                        if (e.namespace == 'youtube')
                            window.history.replaceState("object or string", "Title", "#" + Math.random().toString(36).substr(2));

                    })
                }
            });
            /*
            * Initializete the prompt for setuo your pomodoro
            */
            e('.add').on('click', function () {
                // set it pased true while user choosing the time
                _thisPaused = true;
                // prompt where user will enter the "Project Title"
                var typer = prompt('Nome do Projeto');

                // once user was inputed a project title...
                if (typer !== null) {
                    var desc = prompt('Descrição breve do projeto/Tarefa'),
                        est = prompt('Estimativa(em Minutos)');
                } else {
                    return;
                }

                index++;

                if (typer === null && desc == null) {
                    // set it paused  false if vars typer & desc was no index
                    _thisPaused = false;
                    //return false
                    return;
                } else {
                    _thisPaused = false;
                    // select the target div where infos will appear
                    eelm = e('#detail');

                    // variables to get content of eelem
                    var InnerStatusWork = eelm.find('#currentWork').text(),
                        Status = InnerStatusWork.split(':'),
                        InnerStatusTask = e('#TaskPanel').text(),
                        StatusTask = InnerStatusTask.split(':'),
                        Timex = e('#ht').text();
                    // splits variables into a new index
                    ProjTitle = Status[1];
                    ProjDesc = StatusTask[1];

                    // check again if project title was set... if true
                    if (ProjTitle !== undefined) {

                        // display table pomodoros with your details
                        e('#pomodoros').fadeIn();

                        // reset our clock
                        _thisTarget.html('00:00:00,000');

                        // clear the intervals reset
                        clearInterval(_thisClock);

                        // set clock as null
                        _thisClock = null;

                        // pad number check if is a single number
                        var esTx = (est.length > 1) ? "00:" + est : '00:0' + est;

                        // add in the pomodoros table your curreently time of the work, with expect and much more
                        e('#pomodoros > tbody:last').append('<tr><td>' + index + '</td><td>' + ProjTitle + '</td><td>' + ProjDesc + '</td><td>' + Timex + '</td><td>' + esTx + '</td><td><i class="icon-check-sign icon-large"></i></td></tr>');
                        
                        // THIS STILL IN TESTS
                        e('.save').on('click', function () {
                            e('#pomodoros > tbody:last').append('<tr><td>' + index + '</td><td>' + ProjTitle + '</td><td>' + ProjDesc + '</td><td>' + Timex + '</td><td><i class="icon-check-sign icon-large"></i></td>' + ZeroBefore(est) + 'Min</tr>');
                        });
                    }
                    // clear element id have any data form previously pomodoro
                    eelm.empty().append('<div id="currentWork"><h1>Trabalhando em:</h1><h2>' + typer + '</h2></div><div id="TaskPanel"><span>Tarefa:</span><br><p id="task" class="well well-small">' + desc + '</p></div>');
                }
                // simulate virual click our tigger for start timer
                e('.start').click();

            });
            var i = 1;
            /*
            *
            * This will allow user to add mutiples notepads. It's based ina index variable what has incremented every time
            * the element with the ID #addT has clicked.
            *
            */
            e('#addT').on('click', function () {

                i++;
                e('#Tab li:last-child').before('<li class=""><a href="#notepad' + i + '" data-toggle="tab">Notepad ' + i + '</a></li>');
                e('#notepad').append('<div class="tab-pane" id="notepad' + i + '"><h4>Notepad #' + i + '</h4><textarea class="form-control  txt" id="note' + i + '"></textarea></div>');

                $('.txt').autoResize({
                    extraSpace: 0
                });
            });


            /*
            * If YouTube or "+" was been clickec will show input for user insert data.
            */
            e('#callyt').on('click', function () {
                e("#yt").fadeIn(function () {
                    e(this).animate({
                        width: '850px'
                    }, 100)
                }).focus();

                e('#yt').blur(function () {
                    e(this).fadeOut(function () {
                        e(this).animate({
                            width: '0px'
                        }, 100)
                    });
                })
            });

            e('.export').on('click', function () {
                //window.history.replaceState("object or string", "Title", "#ExportTable");
                CSV.begin('#pomodoros').download('Export.csv').go();
            });

             /**
             * this function will display stopwatch(not the "timer")
             * @constructor
             * @param {inval} d - a timestamp formated day/hour/secound
             */
            function RenderStopWatch(d) {
                return ZeroBefore(d.getUTCHours()) + ':' + ZeroBefore(d.getMinutes()) + ':' + ZeroBefore(d.getSeconds()) + ',' + ZeroBefore(d.getMilliseconds());
            }
             /**
             * Add the 0 before number if its a single number (i.e. 12:3 will be replaced by 12:03, note the 0 intestead)
             * @constructor
             * @param {inval} n - a number, single or not
             * @param {inval} lenght - dynamic set
             */

            function ZeroBefore(n, length) {
                if (typeof (length) == 'undefined') {
                    length = 2;
                }
                while (n.toString().length < length) {
                    n = '0' + n;
                }
                return n;
            }
            /**
             * Do the timer tick increment every secound a variable.
             * @constructor
             * @param {inval} minutes - a intval of minutes will be processed by loop
             */
            function countdown(minutes) {
                var seconds = 60;
                var mins = minutes

                    function loop() {

                        var counter = document.getElementById("counterms");
                        var _that = mins - 1
                        seconds--;
                        counter.innerHTML = _that.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
                        if (seconds > 0) {
                            setTimeout(loop, 1000);
                        } else {
                            if (mins > 1) {
                                countdown(mins - 1);
                            }
                        }
                    }

                loop();
            }

            var o = 0;
            // setting the tigger will start all operation
            e('.start').on('click', function () {
                o++;
                //var durac = 0;

                // disable button to add more pomodoros
                e(".add").prop('disabled', true);
                // set pushstate for url and making a back event to prevent conflits when 2 user uses it at same time
                window.history.replaceState("object or string", "Title", "#" + Math.random().toString(36).substr(2));

                // expects fro pomodoro
                var durac = prompt('Duração do Pomodoro(em minutos, Ex 25 para 25Min)');

                // if user set a valid expect for pomodoro the tab with ID #stats appears 
                if (durac !== "") {
                    e('#stats').fadeIn(2000);
                } else {
                    e('#stats').hide();
                }

                // select element for display my countdown
                var countdown = e("#counter");

                // multiply the minutes by secounds
                var totalTime = durac * 60;

                /*
                * This function prevent to show single number, just remember this function is for countdown,
                * because this i needed to create another.
                *
                * @param {intval} n - a int val date timestamp formated
                */
                function pad(n) {
                    return n > 9 ? "" + n : "0" + n;
                }
                var original = totalTime;

                /*
                * This function prevent to show single number, just remember this function is for countdown,
                * because this i needed to create another.
                * This is just for minutes.
                *
                * @param {intval} n - a int val date timestamp formated
                */
                function _minFormat(n) {
                    return original >= 600 && n <= 9 ? "0" + n : "" + n;
                }

                // set a counter and every time it repeat it decrease a number
                var interval = setInterval(function () {

                    clockLoop();

                    if (totalTime == -1) {
                        clearInterval(interval);
                        return;
                    }
                }, 1000);

                /*
                * This function render the negative clock container
                */
                function render() {
                    var m = Math.floor(totalTime / 60);
                    var seconds = totalTime % 60;

                    m = "<span>-" + _minFormat(m).split("").join("</span><span>") + "</span>";

                    seconds = "<span>" + pad(seconds).split("").join("</span><span>") + "</span>";
                    countdown.html(m + ":" + seconds);
                }

                /*
                *this function is for easy stop/reset and start the function
                */
                function clockLoop() {
                    render();
                    totalTime--;
                }

                clockLoop();


                if (!_thisClock) { // if clock is false
                    //now
                    _thisStart = new Date()
                    
                    // the clock
                    _thisClock = setInterval(function () {
                            if (_thisPaused === true) {
                                return;
                            }
                            var JustNow = new Date(new Date() - _thisStart);
                            var NU = '00:' + ZeroBefore(durac) + ':01,000',
                                NT = RenderStopWatch(JustNow);
                            // NY = NU.split(':'),
                            // NR = NT.split(':');

                            if (RenderStopWatch(JustNow) > '00:' + ZeroBefore(durac) + ':01,000') {

                                var sec = 0;

                                function pad(val) {
                                    return val > 9 ? val : "0" + val;
                                }
                                setInterval(function () {
                                    document.getElementById("secs").innerHTML = pad(++sec % 60);
                                    document.getElementById("mins").innerHTML = pad(parseInt(sec / 60, 10));
                                }, 1000);
                                $('.finished').click(function () {
                                    console.log($(this).context);
                                });
                                $('<div><h1>Oops, Pomodoro Expirou!<i class="ic icon-flag-checkered icon-3x pull-right"></i></h1><p>Já se passaram alguns minutos desque que o tempo esgotou.</p><div class="pull-right" id="">Tempo Sobescalente:<code><span id="mins">00</span>:<span id="secs">00</span></code> </div><br /><h2>1 Pomodoro finalizado</h2></div>').unipromo({
                                    title: '<i class="icon-exclamation icon-large"></i> Tempo esgotado!',
                                    scheme: 'light',
                                    type: 'error',
                                    height: 350,
                                    width: 700,
                                    name: 'expired',
                                }).unipromo('addButton', {
                                    text: 'Adicionar outro',
                                    href: ''
                                });

                                $.subscribe('modal_exit.expired modal_cancel.expired', function (e) {
                                    if (e.namespace == 'expired')
                                        $('#home').click();
                                });

                                e('#ht').addClass('blink');
                                e(".add").prop('disabled', false);
                                e('#status').removeClass('alert-info').addClass('alert-error');
                                document.title = "**[1] Pomodoro expirou!";
                                _thisPaused = true;
                                //window.history.replaceState("object or string", "Title", "#._pomodoroExpired()");
                            } else {
                                _thisTarget.html(RenderStopWatch(JustNow));
                                e('#status').removeClass('alert-error').addClass('alert-info');
                                e('#ht').removeClass('blink');
                            }
                        },
                        1000 / 60);

                } else {
                    _thisPaused = false;

                }

                return false;
            });
        },
        Table2CSV: function () {
            e.fn.toCSV = function () {

                var data = e(this).first(),
                    csvData = [],
                    tmpArr = [],
                    tmpStr = '';
                data.find("tr").each(function () {
                    if (e(this).find("th").length) {
                        e(this).find("th").each(function () {
                            tmpStr = e(this).text().replace(/"/g, '""');
                            tmpArr.push('"' + tmpStr + '"');
                        });
                        csvData.push(tmpArr);
                    } else {
                        tmpArr = [];
                        e(this).find("td").each(function () {
                            if (e(this).text().match(/^-{0,1}\d*\.{0,1}\d+e/)) {
                                tmpArr.push(parseFloat(e(this).text()));
                            } else {
                                tmpStr = e(this).text().replace(/"/g, '""');
                                tmpArr.push('"' + tmpStr + '"');
                            }
                        });
                        csvData.push(tmpArr.join(','));
                    }
                });
                var output = csvData.join('\n');
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(output);
                window.open(uri);
            }
        },
        PreventAccidentalClose: function () {
            window.onbeforeunload = function (event) {

                event = event || window.event;

                var confirmClose = '';
                if (event) {
                    event.returnValue = confirmClose;
                }
                return confirmClose;

            }

        },

    };
})(window);