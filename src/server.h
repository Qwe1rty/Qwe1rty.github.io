#ifndef SERVER_H
#define SERVER_H

#include <Cutelyst/Application>

using namespace Cutelyst;

class server : public Application
{
    Q_OBJECT
    CUTELYST_APPLICATION(IID "server")
public:
    Q_INVOKABLE explicit server(QObject *parent = nullptr);
    ~server();

    bool init();
};

#endif //SERVER_H

