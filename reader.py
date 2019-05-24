import serial
ser = serial.Serial()
ser.baudrate = 38400
ser.port = 'COM3'
ser.open()

x = ser.read(12)
s = x.decode('cp855')
print(type(s))

ser.close()
