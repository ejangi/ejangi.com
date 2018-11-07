FROM ubuntu:bionic

RUN apt-get update && apt-get -y install cron mariadb-client

ADD backup.cron /etc/cron.d/backup.cron
RUN chmod 0644 /etc/cron.d/backup.cron
RUN crontab /etc/cron.d/backup.cron
RUN touch /var/log/cron.log

ADD backup.sh /root/backup.sh
RUN chmod 0774 /root/backup.sh

RUN touch /tmp/environment
COPY cron-entrypoint.sh /root/cron-entrypoint.sh
RUN chmod -v +x /root/cron-entrypoint.sh

ENTRYPOINT ["/root/cron-entrypoint.sh"]
