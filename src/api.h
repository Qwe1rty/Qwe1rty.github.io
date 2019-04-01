#ifndef API_H
#define API_H

#include <Cutelyst/Controller>

using namespace Cutelyst;

class API : public Controller
{
    Q_OBJECT
    C_NAMESPACE("")
public:
    explicit API(QObject *parent = nullptr);
    ~API();

    C_ATTR(root, :Path :AutoArgs)
    void root(Context *c);
};

#endif //API_H

