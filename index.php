<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>POMODORANO</title>    
	<link rel="stylesheet" type="text/css" href="http://bootsnipp.com/css/bootstrap-v3.min.css?v=<?php echo filemtime('css/style.css'); ?>">
	
	<link rel="stylesheet" type="text/css" href="css/style.css?v=<?php echo filemtime('css/style.css'); ?>">
	<script type='text/javascript' src='http://code.jquery.com/jquery-1.9.1.js'></script>
</head>
<body> 
	<div class="container">
		<div class="row panel panel-default">
			<div class="tabbable tabs-left">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#tab1" data-toggle="tab" id="home"><i class="icon-home icon-5x"></i></a></li>
					<li><a href="#tab2" data-toggle="tab" id="stats"><i class="icon-time icon-5x"></i></a></li>
					<li><a href="#tab3" data-toggle="tab"><i class="icon-edit icon-5x"></i></a>
					<li>
						<a href="#r" data-toggle="tab" id="callyt"><i class="icon-plus icon-5x"></i></a><input type="text" id="yt">
					</li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active " id="tab1">
						<blockquote>
							<p>Crie um novo ciclo</p>
						</blockquote>	
						<div class="span8 panel panel-default inner">		
							<div class="btn-toolbar">
								<button class="btnn btn-flat add"><i class="icon-plus"></i> Novo pomodoro</button>
								<button class="btn save" onclick="">Salvar</button>
								<button class="btn export pull-right"><i class="icon-download-alt"></i> Exportar</button>					
							</div>
							<table id="pomodoros" class="table table-hover table-striped table-condensed">
								<thead>
									<tr>
										<th style="width:15px">#</th>
										<th style="width:120px">Projeto</th>
										<th>Descrição</th>
										<th style="width:85px">Duração</th>
										<th style="width:20px">Estimativa</th>
										<th style="width:20px">OK</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>	
					<div class="tab-pane" id="tab2">
						<blockquote>
							<p>Sua tarefa atual</p>
						</blockquote>
						<div id="status" class="alert alert-info">
							<div class="span4">
								<div id="detail"></div>
								<a class="start"></a>
								<a class="finished"></a>
							</div>
							<div class="span4 pull-right" id="clock">
								<h1 id='ht'></h1>
								<span id="counter" class="well"></span>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="tab3">
						<blockquote>
							<p>Anotações Miscelância</p>
						</blockquote>
						<div class="tabbable">
							<ul class="nav nav-tabs" id="Tab">
								<li class=""><a href="#notepad1" data-toggle="tab">Notepad</a></li>
								<li><a href="javascript:;" id="addT"><i class="icon-plus"></i></a></li>
							</ul>
							<div id="notepad" class="tab-content">
								<div class="tab-pane active" id="notepad1">
									<h4>Notepad #1</h4>
									<textarea class="form-control txt" id="m"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<audio id="d">
		<source src="http://guih.us/pomodoro/beep-30.wav" type="audio/wav">
		<source src="http://guih.us/pomodoro/beep-30.mp3" type="audio/mpeg">
	</audio> 
	<script type='text/javascript' src="js/bootstrap.min.js"></script>
	<script type='text/javascript' src="http://www.csvscript.com/dev/html5csv.js"></script> 
	<script type='text/javascript' src="js/pomodoro.min.js?v=<?php echo filemtime('js/pomodoro.min.js'); ?>"></script> 
</body>
</html>

