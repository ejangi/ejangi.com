#!/bin/bash
printenv >> /tmp/environment
cron -f && tail -f /var/log/cron.log