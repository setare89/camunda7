FROM camunda/camunda-bpm-platform:7.23.0

USER root



# کپی کردن config ها
COPY config/tasklist.js /camunda/webapps/camunda/app/tasklist/scripts/config.js
COPY config/admin.js    /camunda/webapps/camunda/app/admin/scripts/config.js
COPY config/cockpit.js  /camunda/webapps/camunda/app/cockpit/scripts/config.js


# کپی کردن HTML ها
COPY html/tasklist.html /camunda/webapps/camunda/app/tasklist/index.html
COPY html/admin.html    /camunda/webapps/camunda/app/admin/index.html
COPY html/cockpit.html  /camunda/webapps/camunda/app/cockpit/index.html


# کپی کردن Locale ها (en + fa)
COPY locales/tasklist.json /camunda/webapps/camunda/app/tasklist/locales/en.json
COPY locales/admin.json    /camunda/webapps/camunda/app/admin/locales/en.json
COPY locales/cockpit.json  /camunda/webapps/camunda/app/cockpit/locales/en.json
COPY locales/welcome.json  /camunda/webapps/camunda/app/welcome/locales/en.json

COPY locales/tasklist.json /camunda/webapps/camunda/app/tasklist/locales/fa.json
COPY locales/admin.json    /camunda/webapps/camunda/app/admin/locales/fa.json
COPY locales/cockpit.json  /camunda/webapps/camunda/app/cockpit/locales/fa.json
COPY locales/welcome.json  /camunda/webapps/camunda/app/welcome/locales/fa.json

# کپی کردن اسکریپت‌ها
COPY scripts/custom.js /camunda/webapps/camunda/app/tasklist/scripts/custom.js
COPY scripts/custom.js /camunda/webapps/camunda/app/admin/scripts/custom.js
COPY scripts/custom.js /camunda/webapps/camunda/app/cockpit/scripts/custom.js


COPY styles/user-styles.css /camunda/webapps/camunda/app/cockpit/styles/user-styles.css
COPY styles/user-styles.css /camunda/webapps/camunda/app/tasklist/styles/user-styles.css
COPY styles/user-styles.css /camunda/webapps/camunda/app/admin/styles/user-styles.css



RUN mkdir -p /camunda/webapps/ROOT && \
    cp -r /camunda/webapps/camunda/* /camunda/webapps/ROOT/

USER camunda
