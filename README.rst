================
Hearbeat Service
================

Simple RESTful HTTP API that can receive heartbeat events from various input sources.
Each received ``POST`` is handled as an individual event.

It is also possible to validate if any events have been received within a specific time period.

------------
The Use case
------------

This simple service are written to monitor whether or not the power is on, at a specific location. Instead of doing something overly complicated this service expects relative frequent *check-ins*. When there's no power, no ``heartbeat`` events can be transmitted. Meaning that this services will expect that a location to keep sending a ``heartbeat`` every configured time interval. Every 15 minutes for example.

So when the power is out for longer periods of time, this service will not receive any data. This will cause the ``healthcheck`` to fail.

--------------------
Implemented Services
--------------------


The ``heartbeat`` Service
=========================

This service only handles ``POST`` requests and treats every valid request as an individual event.

When storing a new event a new ID is generated. This ID is comprised of the current date and time, but represented by ``epoch```; i.e. a large and incremental number. The ``epoch`` are followed by a freshly generated ``ULID``.


Storing Events
**************

When a new event is stored, this is done in the ``Cloudflare Workers KV`` key/value store database. This database are sorted  `lexicographically <https://en.wikipedia.org/wiki/Lexicographic_order>`_. Meaning that when listing objects, that are always returned in the same order.


The ``healthcheck`` Service
===========================

This services validates whether or not at least a single event have been received, within a time period. Currently this is within the 6 most significant digits of the ``epoch``.

---------
Licensing
---------

Using the "Apache License - Version 2.0, January 2004" license. Read the full text in the ``LICENSE`` file.
