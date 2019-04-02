#include "Server.h"

#include "controller/RootController.h"

#include <Cutelyst/Plugins/StaticSimple/staticsimple.h>

using namespace Cutelyst;

Server::Server(QObject *parent) : Application(parent)
{}

Server::~Server()
{}

bool Server::init()
{
    new RootController(this);

    auto staticHandler = new StaticSimple(this);
    staticHandler->setDirs(QStringList(QStringLiteral("static")));

    return true;
}

