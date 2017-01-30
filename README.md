#crazydnsle poc

This is a proof of concept for solving the case of using https in a local network even when there is no internet connection to resolve names.

## Server
Contains the configuration for a [PowerDNS Server](https://www.powerdns.com/) for solving queries like:
```
  <local_ip>.<alias>.moom.pw to resolve to <local_ip>
```

As well there is a small nodejs service that will help the PowerDNS script to resolve the DNS challenges for creating certificates automatically.

## Client
You will find there the scripts to retrieve a valid certificate for your current local ip.

It uses the letsencrypt/acme client dehydrated implemented in bash to obtain the certs.

Execute
```javascript
npm install
node client/index.js alias <your_alias>
```
and follow the instructions.

## The idea
There are some services like [nip.io](http://nip.io/) that use some magic to resolve a public internet name to a local ip addres. i.e.(10.0.0.1.nip.io maps to 10.0.0.1).

## The problem
Even if we have this magical names that point to internal services, we might lose the internet connection, and we won't be able to reach our DNS and resolve the names.
For trying to solve that we can setup the TTL of the domain name to a very high number (like years) and expect (this expectation needs verification) that the name will be cached in your devices.

### The extra problem
What if your gateway/device doesn't have the same ip address? There is a very *hacky* solution that is during a first time usage try to resolve all the possible names in your subnetwork (10.0.0.1.nip.io, 10.0.0.2.nip.io ...) and try to catch them all. Aftewards, discoverying a device is a matter of try/error of a known service.

## The SSL inconvinience
With the idea explained above, in a normal local network we will need to ask for 254 names (some cases can be more other less). And we want to use HTTPS everywhere, for that we will use [Letsencrypt](https://letsencrypt.org/), but obviosly we don't want to ask for that many certificates.
Fortunately Letsencrypt supports SAN (Subjet Alternative Names), meaning that a certificate can be valid for 100 (this is a specific limit of Letsencrypt) names.
So we will need to ask for 3 different certificates if we want to be able to server an https server from any possible ip in your local network.

