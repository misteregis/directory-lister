<?php

/*
 * Find details of the operating system
 * @author Ivijan-Stefan Stipic <creativform@gmail.com>
 * @version 1.1.0 BETA
*/
class OS
{
    /*
	* Get user agent informations
	*
	* @return string
	*/
    public static function user_agent()
    {
        if (isset($_SERVER['HTTP_USER_AGENT']))
        {
            return $_SERVER['HTTP_USER_AGENT'];
        }
        else
        {
            global $HTTP_SERVER_VARS;
            if (isset($HTTP_SERVER_VARS))
            {
                return $HTTP_SERVER_VARS['HTTP_USER_AGENT'];
            }
            else
            {
                global $HTTP_USER_AGENT;
                if (isset($HTTP_SERVER_VARS))
                {
                    return $HTTP_SERVER_VARS;
                }
                else
                {
                    return 'undefined';
                }
            }
        }
    }

    /*
	* Check if OS is Windows
	*
	* @return boolean true or false
	*/
    public static function is_win()
    {
        // Sandard search
        if (in_array(strtoupper(substr(PHP_OS, 0, 3)), array('WIN'), true) !== false)
            return true;

        // Laravel approach
        if(defined('DIRECTORY_SEPARATOR') && '\\' === DIRECTORY_SEPARATOR)
            return true;

        return false;
    }

    /*
	* Check if PHP is 64 bit vesion
	*
	* @return boolean true or false
	*/
	public static function is_php64()
	{
		// Check is PHP 64bit (PHP 64bit only running on 64bit OS version)
		if (version_compare(PHP_VERSION, '5.0.5') >= 0)
		{
			if(defined('PHP_INT_SIZE') && PHP_INT_SIZE === 8)
				return true;
		}

		// Let's play with bits
		if(strlen(decbin(~0)) == 64)
			return true;

		// Let's do something more worse but can work if all above fail
		// The largest integer supported in 64 bit systems is 9223372036854775807. (https://en.wikipedia.org/wiki/9,223,372,036,854,775,807)
		$int = '9223372036854775807';
		if (intval($int) == $int)
			return true;

		// That's the end
		return false;
	}

	/*
	* Check if any OS is 64 bit vesion
	*
	* @return boolean true or false
	*/
	public static function is_os64()
	{
		// Let's ask system directly
		if(function_exists('shell_exec'))
		{
			if (self::is_win())
			{
				// Is Windows OS
				$shell = shell_exec('wmic os get osarchitecture');
				if(!empty($shell))
				{
					if(strpos($shell, '64') !== false)
						return true;
				}
			}
			else
			{
				// Let's check some UNIX approach if is possible
				$shell = shell_exec('uname -m');
				if(!empty($shell))
				{
					if(strpos($shell, '64') !== false)
						return true;
				}
			}
		}

		// Check if PHP is 64 bit vesion (PHP 64bit only running on 64bit OS version)
		$is_php64 = self::is_php64();
		if($is_php64)
			return true;

        // User agent also have hidden informations
        $arch_regex = '/\b(x86_64|x86-64|Win64|WOW64|x64|ia64|amd64|ppc64|sparc64|IRIX64)\b/ix';
        $user_agent = self::user_agent();
        if(preg_match($arch_regex, $user_agent))
            return true;

		// bit-shifting can help also
		if((bool)((1<<32)-1))
			return true;

		return false;
	}

    /**
    * Get operating system architecture number
     *
     * @return int 32 or 64 (bit)
    */
   public static function architecture()
   {
       return self::is_os64() ? 64 : 32;
   }

    /**
     * Get operating system name
     *
     * @param $user_agent null
     * @return string
	 *
	 * @description  This function finding current OS or if user agent is present, then looking only inside user agent
    */
	public static function getOS($user_agent = null)
	{
		$os_array = array();
		if(empty($user_agent)) {
			if(function_exists('php_uname'))
				$user_agent = php_uname('a');
			else if(function_exists('shell_exec') && !self::is_win())
				$user_agent = shell_exec('uname -a');
			else if(function_exists('shell_exec') && self::is_win())
				$user_agent = shell_exec('ver');
			else
				$user_agent = null;

			// Get Windows versions
			foreach(array(
				'95',
				'98',
				'2000',
				'XP Professional',
				'XP',
				'7.1',
				'7',
				'8.1 Pro',
				'8.1 Home',
				'8.1 Enterprise',
				'8.1 OEM',
				'8.1',
				'8 Home',
				'8 Enterprise',
				'8 OEM',
				'8',
				'10.1',
				'10 Home',
				'10 Pro Education',
				'10 Pro',
				'10 Education',
				'10 Enterprise LTSB',
				'10 Enterprise',
				'10 IoT Core',
				'10 IoT Enterprise',
				'10 IoT',
				'10 S',
				'10 OEM',
				'10',
				'server',
				'vista',
				'me',
				'nt'
			) as $ver) {
				$os_array['windows ' . $ver]='Windows ' . $ver; 
			}

			$os_array['microsoft windows']='Microsoft Windows';
			$os_array['windows']='Windows';

			// Get Linux/Unix/Mac
			foreach(array(
				'raspberry' => 'Linux - Raspbian',
				'jessie' => 'Linux - Debian Jessie',
				'squeeze' => 'Linux - Debian Squeeze',
				'wheezy' => 'Linux - Debian Wheezy',
				'stretch' => 'Linux - Debian Stretch',
				'kubuntu' => 'Linux - Kubuntu',
				'mandriva' => 'Linux - Mandriva',
				'lubuntu' => 'Linux - Lubuntu',
				'ubuntu' => 'Linux - Ubuntu',
				'debian' => 'Linux - Debian',
				'gentoo' => 'Linux - Gentoo',
				'manjaro' => 'Linux - Manjaro',
				'opensuse' => 'Linux - openSUSE',
				'openwrt' => 'Linux - openWRT',
				'fedora' => 'Linux - Fedora',
				'linux' => 'Linux',


				'sierra' => 'Mac OS - Sierra',
				'mavericks' => 'Mac OS - Mavericks',
				'yosemite' => 'Mac OS - Yosemite',
				'mac os x' => 'Mac OS X',
				'os x' => 'Mac OS X',
				'mac os' => 'Mac OS',
				'mac' => 'Mac OS',
			) as $ver => $name) {
				$os_array[$ver]=$name; 
			}
		}
		else
		{
			// https://stackoverflow.com/questions/18070154/get-operating-system-info-with-php
			$os_array = array(
				'windows nt 10'                              =>  'Windows 10',
				'windows nt 6.3'                             =>  'Windows 8.1',
				'windows nt 6.2'                             =>  'Windows 8',
				'windows nt 6.1|windows nt 7.0'              =>  'Windows 7',
				'windows nt 6.0'                             =>  'Windows Vista',
				'windows nt 5.2'                             =>  'Windows Server 2003/XP x64',
				'windows nt 5.1'                             =>  'Windows XP',
				'windows xp'                                 =>  'Windows XP',
				'windows nt 5.0|windows nt5.1|windows 2000'  =>  'Windows 2000',
				'windows me'                                 =>  'Windows ME',
				'windows nt 4.0|winnt4.0'                    =>  'Windows NT',
				'windows ce'                                 =>  'Windows CE',
				'windows 98|win98'                           =>  'Windows 98',
				'windows 95|win95'                           =>  'Windows 95',
				'win16'                                      =>  'Windows 3.11',
				'mac os x 10.1[^0-9]'                        =>  'Mac OS X Puma',
				'macintosh|mac os x'                         =>  'Mac OS X',
				'mac_powerpc'                                =>  'Mac OS 9',
				'linux'                                      =>  'Linux',
				'ubuntu'                                     =>  'Linux - Ubuntu',
				'iphone'                                     =>  'iPhone',
				'ipod'                                       =>  'iPod',
				'ipad'                                       =>  'iPad',
				'android'                                    =>  'Android',
				'blackberry'                                 =>  'BlackBerry',
				'webos'                                      =>  'Mobile',
				'(media center pc).([0-9]{1,2}\.[0-9]{1,2})'=>'Windows Media Center',
				'(win)([0-9]{1,2}\.[0-9x]{1,2})'=>'Windows',
				'(win)([0-9]{2})'=>'Windows',
				'(windows)([0-9x]{2})'=>'Windows',
				// Doesn't seem like these are necessary...not totally sure though..
				//'(winnt)([0-9]{1,2}\.[0-9]{1,2}){0,1}'=>'Windows NT',
				//'(windows nt)(([0-9]{1,2}\.[0-9]{1,2}){0,1})'=>'Windows NT',
				'Win 9x 4.90'=>'Windows ME',
				'(windows)([0-9]{1,2}\.[0-9]{1,2})'=>'Windows',
				'win32'=>'Windows',
				'(java)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2})'=>'Java',
				'(Solaris)([0-9]{1,2}\.[0-9x]{1,2}){0,1}'=>'Solaris',
				'dos x86'=>'DOS',
				'Mac OS X'=>'Mac OS X',
				'Mac_PowerPC'=>'Macintosh PowerPC',
				'(mac|Macintosh)'=>'Mac OS',
				'(sunos)([0-9]{1,2}\.[0-9]{1,2}){0,1}'=>'SunOS',
				'(beos)([0-9]{1,2}\.[0-9]{1,2}){0,1}'=>'BeOS',
				'(risc os)([0-9]{1,2}\.[0-9]{1,2})'=>'RISC OS',
				'unix'=>'Unix',
				'os/2'=>'OS/2',
				'freebsd'=>'FreeBSD',
				'openbsd'=>'OpenBSD',
				'netbsd'=>'NetBSD',
				'irix'=>'IRIX',
				'plan9'=>'Plan9',
				'osf'=>'OSF',
				'aix'=>'AIX',
				'GNU Hurd'=>'GNU Hurd',
				'(fedora)'=>'Linux - Fedora',
				'(kubuntu)'=>'Linux - Kubuntu',
				'(ubuntu)'=>'Linux - Ubuntu',
				'(debian)'=>'Linux - Debian',
				'(CentOS)'=>'Linux - CentOS',
				'(Mandriva).([0-9]{1,3}(\.[0-9]{1,3})?(\.[0-9]{1,3})?)'=>'Linux - Mandriva',
				'(SUSE).([0-9]{1,3}(\.[0-9]{1,3})?(\.[0-9]{1,3})?)'=>'Linux - SUSE',
				'(Dropline)'=>'Linux - Slackware (Dropline GNOME)',
				'(ASPLinux)'=>'Linux - ASPLinux',
				'(Red Hat)'=>'Linux - Red Hat',
				// Loads of Linux machines will be detected as unix.
				// Actually, all of the linux machines I've checked have the 'X11' in the User Agent.
				//'X11'=>'Unix',
				'(linux)'=>'Linux',
				'(amigaos)([0-9]{1,2}\.[0-9]{1,2})'=>'AmigaOS',
				'amiga-aweb'=>'AmigaOS',
				'amiga'=>'Amiga',
				'AvantGo'=>'PalmOS',
				//'(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1}-([0-9]{1,2}) i([0-9]{1})86){1}'=>'Linux',
				//'(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1} i([0-9]{1}86)){1}'=>'Linux',
				//'(Linux)([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3}(rel\.[0-9]{1,2}){0,1})'=>'Linux',
				'[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,3})'=>'Linux',
				'(webtv)/([0-9]{1,2}\.[0-9]{1,2})'=>'WebTV',
				'Dreamcast'=>'Dreamcast OS',
				'GetRight'=>'Windows',
				'go!zilla'=>'Windows',
				'gozilla'=>'Windows',
				'gulliver'=>'Windows',
				'ia archiver'=>'Windows',
				'NetPositive'=>'Windows',
				'mass downloader'=>'Windows',
				'microsoft'=>'Windows',
				'offline explorer'=>'Windows',
				'teleport'=>'Windows',
				'web downloader'=>'Windows',
				'webcapture'=>'Windows',
				'webcollage'=>'Windows',
				'webcopier'=>'Windows',
				'webstripper'=>'Windows',
				'webzip'=>'Windows',
				'wget'=>'Windows',
				'Java'=>'Unknown',
				'flashget'=>'Windows',
				// delete next line if the script show not the right OS
				//'(PHP)/([0-9]{1,2}.[0-9]{1,2})'=>'PHP',
				'MS FrontPage'=>'Windows',
				'(msproxy)/([0-9]{1,2}.[0-9]{1,2})'=>'Windows',
				'(msie)([0-9]{1,2}.[0-9]{1,2})'=>'Windows',
				'libwww-perl'=>'Unix',
				'UP.Browser'=>'Windows CE',
				'NetAnts'=>'Windows',
			);
		}
		foreach ($os_array as $regex => $value) {
			if (preg_match('{\b('.$regex.')\b}i', $user_agent)) {
				return $value;
			}
		}
		return 'undefined';
	}
}
