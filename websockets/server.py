# WebSocket compenent for the YRS Progress meter, pre-week prep

import socket

from threading import Thread

import atexit

import tornado.ioloop
import tornado.web
import tornado.websocket

## Important variables

# Connections should be appended in the following format:
# 'progress bar view code' : [list of connections]
#
# When each session has no connections left in it, it should be destroyed
connection_list = {}

## Functions

def getMotiveFromPhpMessage(message):
    index = 0
    motive = ''
    while not message[index] == ':':
        if index >= len(message):
            return False
        motive += message[index]
        index += 1
    return motive

def getPropertyFromPhpMessage(message, message_property):
    index = message.find(message_property, 0)
    if index > 0:
        index += len(message_property) + 1
        property_result = ''
        while not message[index] == ';':
            property_result += message[index]
            index += 1
        return property_result
    else:
        return False

def phpMessageListen(phpMessageHandlers):

    UDP_IP = '127.0.0.1'
    UDP_PORT = 8899

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    s.bind((UDP_IP, UDP_PORT))

    while True:

        data, addr = s.recvfrom(1024)

        phpMessage = data.decode('utf-8')

        print('Received message: ' + str(phpMessage))

        motive = getMotiveFromPhpMessage(phpMessage)

        if motive in phpMessageHandlers:
            phpMessageHandlers[motive](phpMessage)

# Called upon receiving a 'update' motivated message from PHP
def phpUpdateHandler(message):

    viewcode = getPropertyFromPhpMessage(message, 'viewcode')
    stage = getPropertyFromPhpMessage(message, 'stage')

    if viewcode in connection_list:
        for connection in connection_list[viewcode]:
            connection.write_message('update:;stage:' + stage + ';:endof')

    print('Received update message!')

def exitHandler():
    print('exiting!')
    phpListenThread.join()

## Classes

# The web socket responder/handler
class client_connection(tornado.websocket.WebSocketHandler):

    viewcode = ''

    def open(self, viewcode):

        if not viewcode in connection_list:
            connection_list[viewcode] = []

        connection_list[viewcode].append(self)

        self.viewcode = viewcode

        print("WebSocket opened: " + str(self))

    def on_message(self, message):
        print("Message Received: " + message)

    def on_close(self):

        connection_list[self.viewcode].remove(self)
            
        print("WebSocket closed: " + str(self))

    def check_origin(self, origin):
        return True

# Make sure we shut everything down if we exit the application!
atexit.register(exitHandler)

# Create a list message handlers
phpMessageHandlers = {'update' : phpUpdateHandler}

# Start the phpMessageListen function loop
phpListenThread = Thread(target=phpMessageListen, args=(phpMessageHandlers,))
phpListenThread.start()

# Create a Tornado web application to handle websocket requests
application = tornado.web.Application([
    (r"/test/(.*)", client_connection),
])

# Make the Tornado application listen on port 8897, the websocket port 
application.listen(8897)

# Start the application loop
tornado.ioloop.IOLoop.current().start()
