jQuery(function (e) {

    e(function () { 
        POMODORO.init();
    });

    var POMODORO = {
        init: function () {
            this.startX();
            this.Table2CSV();
            this.PreventAccidentalClose();
            this.ElasticTextarea();

        },
        startX: function () {
            window.history.pushState("object or string", "Title", "#ready");

            e(document).on('mouseover', function () {
                document.title = "POMODORANO";
            });
            e('.finished').on('click', function () {
                var plr = document.getElementById('d');
                plr.play();
            });
            e('#stats').hide();
            e('#pomodoros').hide();
            var _thisClock = null,
                _thisStart = 0,
                _thisTarget = e('#ht'),
                _thisPaused = false,
                index = 1;
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
            e('.add').on('click', function () {
                _thisPaused = true;
                var typer = prompt('Nome do Projeto');
                if (typer !== null) {
                    var desc = prompt('Descrição breve do projeto/Tarefa'),
                        est = prompt('Estimativa(em Minutos)');
                } else {
                    return;
                }
                index++;
                if (typer === null && desc == null) {
                    _thisPaused = false;
                    return;
                } else {
                    _thisPaused = false;
                    eelm = e('#detail');

                    var InnerStatusWork = eelm.find('#currentWork').text(),
                        Status = InnerStatusWork.split(':'),
                        InnerStatusTask = e('#TaskPanel').text(),
                        StatusTask = InnerStatusTask.split(':'),
                        Timex = e('#ht').text();

                    ProjTitle = Status[1];
                    ProjDesc = StatusTask[1];


                    if (ProjTitle !== undefined) {
                        e('#pomodoros').fadeIn();
                        _thisTarget.html('00:00:00,000');
                        clearInterval(_thisClock);
                        _thisClock = null;

                        var esTx = (est.length > 1) ? "00:" + est : '00:0' + est;

                        e('#pomodoros > tbody:last').append('<tr><td>' + index + '</td><td>' + ProjTitle + '</td><td>' + ProjDesc + '</td><td>' + Timex + '</td><td>' + esTx + '</td><td><i class="icon-check-sign icon-large"></i></td></tr>');
                        e('.save').on('click', function () {
                            e('#pomodoros > tbody:last').append('<tr><td>' + index + '</td><td>' + ProjTitle + '</td><td>' + ProjDesc + '</td><td>' + Timex + '</td><td><i class="icon-check-sign icon-large"></i></td>' + ZeroBefore(est) + 'Min</tr>');
                        });
                    }
                    eelm.empty().append('<div id="currentWork"><h1>Trabalhando em:</h1><h2>' + typer + '</h2></div><div id="TaskPanel"><span>Tarefa:</span><br><p id="task" class="well well-small">' + desc + '</p></div>');
                }

                e('.start').click();

            });
            var i = 1;
            e('#addT').on('click', function () {

                i++;
                e('#Tab li:last-child').before('<li class=""><a href="#notepad' + i + '" data-toggle="tab">Notepad ' + i + '</a></li>');
                e('#notepad').append('<div class="tab-pane" id="notepad' + i + '"><h4>Notepad #' + i + '</h4><textarea class="form-control  txt" id="note' + i + '"></textarea></div>');

                $('.txt').autoResize({
                    extraSpace: 0
                });
            });


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


            function RenderStopWatch(d) {
                return ZeroBefore(d.getUTCHours()) + ':' + ZeroBefore(d.getMinutes()) + ':' + ZeroBefore(d.getSeconds()) + ',' + ZeroBefore(d.getMilliseconds());
            }

            function ZeroBefore(n, length) {
                if (typeof (length) == 'undefined') {
                    length = 2;
                }
                while (n.toString().length < length) {
                    n = '0' + n;
                }
                return n;
            }

            function countdown(minutes) {
                var seconds = 60;
                var mins = minutes

                    function tick() {

                        var counter = document.getElementById("counterms");
                        var current_minutes = mins - 1
                        seconds--;
                        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
                        if (seconds > 0) {
                            setTimeout(tick, 1000);
                        } else {
                            if (mins > 1) {
                                countdown(mins - 1);
                            }
                        }
                    }

                tick();
            }

            var o = 0;

            e('.start').on('click', function () {
                o++;
                //var durac = 0;
                e(".add").prop('disabled', true);
                window.history.replaceState("object or string", "Title", "#" + Math.random().toString(36).substr(2));
                var durac = prompt('Duração do Pomodoro(em minutos, Ex 25 para 25Min)');
                if (durac !== "") {
                    e('#stats').fadeIn(2000);
                } else {
                    e('#stats').hide();
                }

                var countdown = e("#counter");


                var totalTime = durac * 60;

                function pad(n) {
                    return n > 9 ? "" + n : "0" + n;
                }
                var original = totalTime;

                function _minFormat(n) {
                    return original >= 600 && n <= 9 ? "0" + n : "" + n;
                }


                var interval = setInterval(function () {

                    clockLoop();

                    if (totalTime == -1) {
                        clearInterval(interval);
                        return;
                    }
                }, 1000);


                function render() {

                    var m = Math.floor(totalTime / 60);
                    var seconds = totalTime % 60;

                    m = "<span>-" + _minFormat(m).split("").join("</span><span>") + "</span>";

                    seconds = "<span>" + pad(seconds).split("").join("</span><span>") + "</span>";
                    countdown.html(m + ":" + seconds);
                }

                function clockLoop() {
                    render();
                    totalTime--;
                }

                clockLoop();


                if (!_thisClock) {

                    _thisStart = new Date();
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