#include "server.h"

#include "root.h"

using namespace Cutelyst;

server::server(QObject *parent) : Application(parent)
{
}

server::~server()
{
}

bool server::init()
{
    new Root(this);

    return true;
}

