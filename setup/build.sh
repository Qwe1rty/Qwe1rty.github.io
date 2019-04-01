#!/usr/bin/env bash

COMPILE_DIR='build'
COMPILER_VERS='Visual Studio 15 2017 Win64'

main() {
    if [[ -L "${COMPILE_DIR}" ]] ; then
        rm -f "$COMPILE_DIR"
    fi
    if [[ ! -d "${COMPILE_DIR}" ]] ; then
        mkdir "${COMPILE_DIR}"
    fi

    cd "${COMPILE_DIR}"
    cmake .. -G "${COMPILER_VERS}" -DCMAKE_SH='CMAKE_SH-NOTFOUND' && cmake --build . --config Release
}

main