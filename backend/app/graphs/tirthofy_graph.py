from langgraph.graph import StateGraph, END


from app.graphs.state import TirthofyState


from app.graphs.nodes.temple_node import temple_node


graph = StateGraph(
    TirthofyState
)


# Nodes

graph.add_node(
    "temple",
    temple_node
)


# Entry

graph.set_entry_point(
    "temple"
)


# Edges

graph.add_edge(
    "temple",
    END
)


# Compile

tirthofy_graph = graph.compile()
