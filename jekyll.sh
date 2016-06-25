#!/bin/sh
#BaseDir=$(cd `dirname $0`; pwd)
cd `dirname $0`
jekyll serve --watch  -d /tmp/jekyll
