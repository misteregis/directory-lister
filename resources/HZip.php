<?php

class HZip {
    /**
     * Add files and sub-directories in a folder to zip file.
     * @param string $folder
     * @param ZipArchive $zipFile
     * @param int $exclusiveLength Number of text to be exclusived from the file path.
     */
    private static function folderToZip($folder, &$zipFile, $exclusiveLength, $exclude) {
        $handle = opendir($folder);
        while (false !== $f = readdir($handle)) {
            if ($f != '.' && $f != '..') {
                //if (fnmatch($f, $exclude)) continue;
                $continue = false;
                foreach($exclude as $x)
                    if (fnmatch($x, $f))
                        $continue = true;
                if ($continue) continue;
                $filePath = "$folder/$f";
                // Remove prefix from file path before add to zip.
                $localPath = substr($filePath, $exclusiveLength);
                //$localPath = $filePath;
                if (is_file($filePath)) {
                    $zipFile->addFile($filePath, $localPath);
                } elseif (is_dir($filePath)) {
                    // Add sub-directory.
                    $zipFile->addEmptyDir($localPath);
                    self::folderToZip($filePath, $zipFile, $exclusiveLength, $exclude);
                }
            }
        }
        closedir($handle);
    }

    /**
     * Zip a folder (include itself).
     * Usage:
     *   HZip::zipDir('/path/to/sourceDir', '/path/to/out.zip');
     *
     * @param string $sourcePath Path of directory to be zip.
     * @param string $outZipPath Path of output zip file.
     * @param array $outZipPath[zipname] Name of output zip file.
     */
    public static function zipDir($sourcePath, $outZipPath, $exclude = array())
    {
        $pathInfo = pathInfo($sourcePath);
        $parentPath = $pathInfo['dirname'];
        $dirName = $pathInfo['basename'];
        $zipname = false;

        $z = new ZipArchive();

        if (gettype($outZipPath) === 'array') {
            if (!$temp_file = tempnam(sys_get_temp_dir(), 'tempzip'))
                $temp_file = tempnam('tmp', 'tempzip');

            $zipname = $outZipPath['zipname'];
            $outZipPath = $temp_file;
        }

        $z->open($outZipPath, ZIPARCHIVE::CREATE|ZipArchive::OVERWRITE);
        $z->addEmptyDir($dirName);
        self::folderToZip($sourcePath, $z, ($parentPath==='.'?0:strlen("$parentPath/")), $exclude);
        $z->close();

        if ($zipname)
            self::zipDownload($outZipPath, $zipname);
    }

    /**
     * Zip to temporary folder and download
     *
     * @param string $filename Name of zip file.
     */
    private static function zipDownload($zipfile, $zipname)
    {
        header('Content-Type: application/zip');
        header('Content-disposition: attachment; filename='.$zipname);
        header('Content-Length: ' . filesize($zipfile));
        ob_clean();flush();
        readfile($zipfile);
        unlink($zipfile);
        exit;
    }
}