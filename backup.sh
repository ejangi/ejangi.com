file_env() {
    local var="$1"
    local fileVar="${var}_FILE"
    local def="${2:-}"
    if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
        echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
        exit 1
    fi
    local val="$def"
    if [ "${!var:-}" ]; then
        val="${!var}"
    elif [ "${!fileVar:-}" ]; then
        val="$(< "${!fileVar}")"
    fi
    export "$var"="$val"
    unset "$fileVar"
}

file_env 'MYSQL_ROOT_PASSWORD'
touch /var/lib/mysql/$MYSQL_DATABASE-nightly.sql
/usr/bin/mysqldump -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > /var/lib/mysql/$MYSQL_DATABASE-nightly.sql