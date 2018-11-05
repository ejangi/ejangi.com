FROM mariadb:latest

RUN apt-get update && apt-get -y install cron

ADD backup.cron /etc/cron.d/backup.cron
RUN chmod 0644 /etc/cron.d/backup.cron

ADD backup.sh /root/backup.sh
RUN chmod 0774 /root/backup.sh