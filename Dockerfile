FROM cypress/included:13.17.0

RUN mkdir /app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY cypress.config.js ./
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT [ "npx", "cypress", "run" ]

CMD [""]
