<?php
    $command = $_GET['request'];
    $host = "localhost";
    $user = 'eonerals';
    $password = '';
    $database = 'eonerals';
    $sql = mysqli_connect($host , $user , $password , $database);
    if(!$sql){
        die("Error to connect !");
    }
    if($command == 'send'){
        $testimoni = $_POST['testimoni'];
        $nama = $_POST['nama'];
        $query = "INSERT INTO testimoni
                    VALUES (NULL,'$nama','$testimoni',CURDATE())";
        echo $query;
        mysqli_query($sql,$query);
        if(mysqli_affected_rows($sql) > 0 ){
            echo "testimoni berhasil di masukkan";
        }
        else {
            echo "testimoni gagal di masukkan";
        }
    }
    else if($command == 'get'){
        $query = "SELECT * FROM testimoni";
        $result = mysqli_query($sql,$query);
        while($row = mysqli_fetch_row($result)){
            $data[] = $row;
        }
        if(isset($data))
        echo json_encode($data);
    }
    else if($command == 'count'){
        $query = "SELECT COUNT(*) FROM testimoni";
        $result = mysqli_query($sql,$query);
        
        echo json_encode($data);
    }
    else{
        echo "echo command not found";
    }
?>