FROM oven/bun:1.4.3
COPY . .
RUN apt-get -y update
RUN apt-get -y install git
RUN bun install --frozen-lockfile
ENTRYPOINT [ "bun", "run", "start" ]