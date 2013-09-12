<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>POMODORANO</title>    
	<link rel="stylesheet" type="text/css" href="css/style.css?v=<?php echo filemtime('css/style.css'); ?>">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="panel-title">
						<span class="logo"></span>
					 JSPomodoro
					</div>
				</div>
				<div class="panel-body">
					<div class="tabbable tabs-left">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#tab1" data-toggle="tab" id="home"><i class="icon-home icon-3x"></i></a></li>
							<li><a href="#tab2" data-toggle="tab" id="stats"><i class="icon-time icon-3x"></i></a></li>
							<li><a href="#tab3" data-toggle="tab"><i class="icon-edit icon-3x"></i></a>
								<li>
									<a href="#r" data-toggle="tab" id="callyt"><i class="icon-plus icon-3x"></i></a><input type="text" id="yt">
								</li>
							</ul>
							<div class="tab-content">
								<div class="tab-pane active " id="tab1">
									<div class="bs-callout bs-callout-info">
										<h4>Crie um novo ciclo Pomodoro</h4>
										<p>Geralmente isso varia de pessoa, porém o mais usado é 25 min para trabalhar e 5 descansando.</p>
									</div>	
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
									<div class="bs-callout bs-callout-info">
										<h4>Sua tafera atual</h4>
										<p>Aqui é descrito e cronometrado o serviço que você está a fazer neste momento.</p>
									</div>	
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
									<div class="bs-callout bs-callout-info">
										<h4>Anotações miscelância</h4>
										<p>Guarde suas notas rápidas aqui, crie quantos notepads forem necesários(máx 9).</p>
									</div>	
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
			</div>
		</div>
	<script type='text/javascript' src="js/jquery.js?v=<?php echo filemtime('js/jquery.js'); ?>"></script>.
	<script type='text/javascript' src="js/pomodoro.js?v=<?php echo filemtime('js/pomodoro.js'); ?>"></script>.
	<script type='text/javascript' src="js/textarea.js"></script>
	<script type='text/javascript' src="js/bootstrap.min.js"></script>
	<script type='text/javascript' src="js/modal.js"></script>
	<script type='text/javascript' src="http://www.csvscript.com/dev/html5csv.js"></script> 
<!--	<script type='text/javascript' src="js/pomodoro.min.js?v=<?php echo filemtime('js/pomodoro.min.js'); ?>"></script> -->
</body>
</html>

