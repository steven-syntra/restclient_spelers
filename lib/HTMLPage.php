<?php
class HTMLPage
{
    var $title ;    //title
    var $body;

    var $use_bootstrap = true;
    var $css_files = array();
    var $js_files_head = array();
    var $js_files = array();

    var $output;

    function __construct( $title = "" ) { $this->title = $title; }

    public function Add( $more ) { $this->body .= $more; }

    public function AddCSS( $src ) { $this->css_files[] = $src; }
    public function AddJava( $src, $head=false )
    {
        if ( $head ) $this->js_files_head[] = $src;
        $this->js_files[] = $src;
    }

    public function AddBootstrap()
    {
        $this->use_bootstrap = true;
    }
    //HTML pagina opbouwen en stockeren in $this->output
    public function Generate()
    {
        $this->output = "<!DOCTYPE html>";
        $this->output .= "<html lang='nl'>";
        $this->output .= '<head>';
        $this->output .= '<meta charset="UTF-8">';
        $this->output .= '<title>' . $this->title . '</title>';

        //use bootstrap?
        if ( $this->use_bootstrap )
        {
            $this->output .= '
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" 
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <!-- jQuery library -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <!-- Latest compiled JavaScript -->
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';
        }

        //css files
        foreach($this->css_files as $css_file)
        {
            $this->output .= '<link rel="stylesheet" href="' . $css_file . '">';
        }

        //js files head
        foreach($this->js_files_head as $js_file_head)
        {
            $this->output .= '<script src="' . $js_file_head . '"></script>';
        }

        $this->output .= '</head>';

        //body
        $this->output .= "<body>";
        $this->output .= $this->body ;

        //javascript files
        foreach( $this->js_files as $js_file)
        {
            $this->output .= '<script src="' . $js_file . '"></script>';
        }

        $this->output .= "</body>";
        $this->output .= "</html>";
    }
    public function __toString()
    {
        return $this->output;
    }
}