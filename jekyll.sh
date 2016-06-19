#!/bin/sh
#http://www.cnblogs.com/nekoooo/p/5477987.html
#http://justjavac.com/jekyll/2011/11/30/install-jekyll.html
cd `dirname $0`
jekyll serve --watch  -d /tmp/jekyll
