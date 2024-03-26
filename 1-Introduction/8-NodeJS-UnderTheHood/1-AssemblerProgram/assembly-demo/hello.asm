section .data
    mensaje db 'Hello, World!', 10, 0    ; Añade un carácter de nueva línea al final del mensaje

section .text
    global _start                    ; Punto de entrada del programa

_start:
    ; Escribir el mensaje en la consola
    mov eax, 4                       ; syscall para escribir
    mov ebx, 1                       ; descriptor de archivo estándar de salida (stdout)
    mov ecx, mensaje                 ; dirección del mensaje a imprimir
    mov edx, 14                      ; longitud del mensaje, incluyendo el carácter de nueva línea
    int 0x80                         ; realizar la llamada al sistema

    ; Salir del programa
    mov eax, 1                       ; syscall para salir
    xor ebx, ebx                     ; código de salida 0
    int 0x80                         ; realizar la llamada al sistema
