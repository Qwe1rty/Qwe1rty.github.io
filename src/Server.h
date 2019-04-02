#ifndef SERVER_H
#define SERVER_H

#include <Cutelyst/Application>

using namespace Cutelyst;

class Server : public Application
{
    Q_OBJECT
    CUTELYST_APPLICATION(IID "server")
public:
    Q_INVOKABLE explicit Server(QObject *parent = nullptr);
    ~Server() override;

    bool init() override;
};

#endif //SERVER_H

