<?php 
  error_reporting(E_ERROR | E_PARSE);

  $page = (!is_null($_GET["page"]) && $_GET["page"] && intval($_GET["page"]) > 0) ? intval($_GET["page"]) : 1;

  header('Content-Type: application/json; charset=utf-8');

  function newRes($Sentdata, $state = "ok", $stateCode = 200, $currentPage = 1, $fL = 0) {
    http_response_code($stateCode);
    return json_encode([
      "filesLength" => $fL,
      "code" => $stateCode,
      "message" => $state,
      "page" => $currentPage,
      "data" => $Sentdata
    ], JSON_PRETTY_PRINT);
  }

  try {
    $resultsPerPage = 5;

    $path    = '../static/gallery/';
    $publicPath    = '/static/gallery/';

    $files = scandir($path);
    if(!$files) throw new Exception("La ruta especificada no existe");

    $filesLength = count($files) - 2;

    $pageQuantities = floor($filesLength / $resultsPerPage);

    $files = array_diff(scandir($path), array('.', '..'));
    $dataArray = [];
    foreach($files as $i => $file){
      $index = $i-2;
      $operation = (($page*$resultsPerPage) - $resultsPerPage);
      $pageStartIndex = $operation > 0 ? $operation : 0;
      list($width, $height) = getimagesize($path.$file); 
      if($index >= $pageStartIndex && $index <= $pageStartIndex+$resultsPerPage-1) {
        array_push($dataArray, [
          "src" => $publicPath.$file,
          "height" => $height,
          "width" => $width
        ]);
      }
    }
    echo newRes($dataArray, "OK", 200, $page, $filesLength);
  } catch (\Throwable $th) {
    echo newRes([], $th->getMessage(), 500, null);
  }
?>