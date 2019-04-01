#include "server.h"

#include "root.h"
#include "api.h"

using namespace Cutelyst;

Server::Server(QObject *parent) : Application(parent)
{
}

Server::~Server()
{
}

bool Server::init()
{
    new API(this);
    return true;
}

