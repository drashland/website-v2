# Configuration

## Table of Contents

- [read_body](#read-body)

## read_body

{{ note_since_simple: v2.8.0 }}

The default behavior of Drash is to read the request body automatically, which
may not align with your server's requirements. You can turn off this default
behavior when creating your server via the `request.read_body` config. Example
usage for this config can be found on the
[Tutorials > Servers > Configuration](/drash/v2.x/tutorials/servers/configuration)
page (look for Optional > request.read_body?: boolean under the Table of
Contents).
