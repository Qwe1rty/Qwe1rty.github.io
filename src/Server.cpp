#include "Server.h"

#include "controller/RootController.h"

#include <Cutelyst/Plugins/StaticSimple/staticsimple.h>
#include <QtCore/QtCore>
#include <log/Logger.h>

using namespace Cutelyst;

Server::Server(QObject *parent) : Application(parent)
{}

bool Server::init()
{
    new RootController(this);

    auto staticHandler = new StaticSimple(this);
    staticHandler->setDirs(QStringList(QStringLiteral("static")));

    qCDebug(SERVER) << "Completed server initialization";
    return true;
}

