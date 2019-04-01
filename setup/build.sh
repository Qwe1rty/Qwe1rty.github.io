#!/usr/bin/env bash

COMPILE_DIR='build'
COMPILER_VERS='Visual Studio 15 2017 Win64'

main() {
    if [[ -d "${COMPILE_DIR}" ]] ; then
        rm -rf "${COMPILE_DIR}"
    fi

    mkdir "${COMPILE_DIR}"
    cd "${COMPILE_DIR}"

    if cmake .. -G "${COMPILER_VERS}" ; then
        cmake --build . --config Release
    fi
}

main