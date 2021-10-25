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

When storing a new event a new ID is generated. This ID is comprised of the current date and time, but represented by ``epoch```; i.e. a large and incremental number. The ``epoch`` are followed by a freshly generated ``ULID``.


Storing Events
**************

When a new event is

The ``healthcheck`` Service
===========================


---------
Licensing
---------
